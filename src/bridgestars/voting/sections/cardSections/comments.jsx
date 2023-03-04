import React from 'react';
import { Component } from 'react';
//MUI
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Card,
  Grid,
} from '@mui/material';
import { MoreVert, Send, Delete, ThirtyFpsSelect } from '@mui/icons-material';
//OTIS KIT
import MKTypography from 'otis/MKTypography';
import MKBox from 'otis/MKBox';
//BRIDGESTARS
import TextEditor from 'bridgestars/components/text-editor/textEditor';
import { drawXSVoter } from './voter';
import { drawAuthor } from './author';

import { PulseLoader } from 'react-spinners';

export default class Comments extends Component {
  state = {
    writeOpen: false,
    commentText: '',
    charCount: 0,
    comments: [],
    loadingState: 'loading',
    sortBy: '',
    showCommentBtn: [],
  };

  constructor(props) {
    super(props);
    this.post = props.post;
    this.maxLength = props.maxLength ?? 1000;
    this.show = props.show;
    this.setShowSignin = props.setShowSignin;
    this.setNbrComments = props.setNbrComments;
  }

  //on mount metthod
  componentDidMount() {
    if (this.state.loadingState != 'loaded' && this.post && this.show) {
      console.log('loading comments');
      this.loadComments();
    }
  }
  componentWillUnmount() {
    //this.setNbrComments(this.state.comments.count);
  }
  async getComments() {
    const chat = this.post.get('chat');
    if (chat) {
      try {
        const messages = await new Parse.Query('Message')
          .equalTo('chat', chat)
          .select('text', 'reactions', 'sender')
          .descending('createdAt')
          .find();

        const authors = await new Parse.Query('_User')
          .containedIn(
            'objectId',
            messages.map((m) => m.get('sender'))
          )
          .select('dispName', 'img')
          .find();
        // console.log("authors:" + JSON.stringify(authors))

        const votes = await new Parse.Query('Reaction')
          .equalTo('user', Parse.User.current()?.id)
          .containedIn(
            'target',
            messages.map((m) => m.id)
          )
          .equalTo('type', 2)
          .select('target')
          .find();

        if (messages && authors) {
          const comments = messages.map((m, i) => {
            return {
              likes: m.get('reactions')['1'] ?? 0,
              text: m.get('text'),
              author: authors.find((a) => a.id == m.get('sender')),
              creationTime: m.createdAt,
              voted: votes.filter((v) => v.get('target') == m.id).length > 0,
              id: m.id,
            };
          });
          return comments;
        }
      } catch (e) {
        if (e.message?.includes('Unable to connect to the Parse API'))
          return alert(
            'Could not connect, please check your internet connection.'
          );
        alert(e.message);
        console.log(e);
      }
    }

    return null;
  }

  sendComment = async () => {
    if (this.state.commentText == '') return alert('No text entered');
    if (!Parse.User.current()) return this.setShowSignin('comment');
    try {
      const obj = await new Parse.Object('Message', {
        text: this.state.commentText,
        chat: this.post.get('chat'),
      }).save();
      this.setState({
        comments: [
          {
            text: this.state.commentText,
            author: Parse.User.current(),
            creationTime: new Date(),
            likes: 0,
            voted: false,
            id: obj.id,
          },
          ...this.state.comments,
        ],
      });
      this.setState({ commentText: '' });
      this.setState({ charCount: 0 });
      this.setState({ reloadEditor: !this.state.reloadEditor });
      this.setNbrComments(this.state.comments.count);
    } catch (error) {
      if (
        error?.message?.includes('Unable to connect to the Parse API') ||
        false
      )
        return alert(
          'Could not connect, please check your internet connection.'
        );
      alert(error.message);
      console.log(error);
    }
    // this.loadComments();
  };
  loadComments = async () => {
    this.setState({ loadingState: 'loading' });

    if (this.state.comments.length != 0) {
      this.setState({ loadingState: 'loading' });
    }
    //download comments
    const data = await this.getComments();
    if (data) {
      this.setState({ comments: data });
      this.setState({ loadingState: 'loaded' });
    } else {
      this.setState({ loadingState: 'no comments' });
    }
  };

  updateCommentText(html) {
    this.setState({ commentText: html });
    console.log(html);
    var cont = html.replace(/<[^>]*>/g, ' ');
    cont = cont.replace(/\s+/g, ' ');
    cont = cont.trim();
    var n = cont.length;
    this.setState({ charCount: n });
  }

  async handleVote(commentId) {
    try {
      const comments = this.state.comments;
      const updateDocLocal = async (inc) => {
        const incr = (doc) => {
          doc.likes += inc;
          doc.voted = !doc.voted;
          return doc;
        };
        this.setState({
          comments: comments.map((doc) =>
            doc.id == commentId ? incr(doc) : doc
          ),
        });
      };
      if (Parse.User.current() && comments != null) {
        const comment = comments.find((c) => c.id == commentId);
        if (!comment) throw new Error('Comment not found');
        if (comment.voted) {
          //local
          updateDocLocal(-1);
          var reactions = await new Parse.Query('Reaction')
            .equalTo('type', 2)
            .equalTo('target', commentId)
            .equalTo('user', Parse.User.current().id)
            .find();
          if (reactions) await Parse.Object.destroyAll(reactions);
        } else {
          //local
          updateDocLocal(1);
          await new Parse.Object('Reaction', {
            data: 1,
            type: 2,
            target: commentId,
          }).save();
        }
      } else {
        this.setShowSignin('vote');
      }
    } catch (error) {
      console.log(error);
      if (error.message?.includes('Unable to connect to the Parse API'))
        return alert(
          'Could not connect, please check your internet connection.'
        );
      alert(error.message);
    }
  }
  async deleteMessage(id) {
    try {
      console.log(this.state.comments.map((c) => c.id));
      await new Parse.Object('Message', { id: id }).destroy();
      this.setState({
        comments: this.state.comments?.filter((c) => c.id != id),
      });
      console.log(this.state.comments.map((c) => c.id));
      this.setState({ reloadEditor: !this.state.reloadEditor });
    } catch (error) {
      console.log(error);
      if (error.message?.includes('Unable to connect to the Parse API'))
        return alert(
          'Could not connect, please check your internet connection.'
        );
      alert(error.message);
    }
  }

  commentMenu({ deleteMessage }) {
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = async (option) => {
      setAnchorEl(null);
      if (option == 'Delete') {
        //TODO nice alert like in dashboard
        deleteMessage();
      }
    };
    const options = [
      'Delete',
      // 'Edit'
    ];
    return (
      <div>
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={() => handleClose(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  drawCommentInstance(
    key,
    id,
    text,
    likes,
    author,
    creationTime,
    voted,
    handleVote
  ) {
    return (
      <Box
        key={key}
        onClick={() => {
          console.log(this.state.showCommentBtn);
          this.setState({ showCommentBtn: [{ key, clicked: true }] });
        }}
        onMouseEnter={() => {
          console.log(this.state.showCommentBtn);
          this.setState({ showCommentBtn: [{ key }] });
        }}
        onMouseLeave={() => {
          console.log(this.state.showCommentBtn);
          this.setState({
            showCommentBtn: this.state.showCommentBtn?.filter(
              (c) => c.key != key && !c.clicked
            ),
          });
        }}
      >
        <Box mx={1} display='flex'>
          <Box width='min-content' pt='12px'>
            {drawXSVoter(voted, likes, handleVote)}
          </Box>
          <Box width='100%' key={this.state.reloadEditor}>
            <TextEditor
              placeholder={'This comment could not be loaded.'}
              readOnly={true}
              theme='bubble'
              content={text}
            />
            <Box mx={1.5} mt={0.5}>
              {drawAuthor(author, creationTime)}
            </Box>
          </Box>
          <Box
            display={
              this.state.showCommentBtn?.find((c) => c.key == key)
                ? 'block'
                : 'none'
            }
          >
            {author.id == Parse.User.current()?.id && (
              <this.commentMenu deleteMessage={() => this.deleteMessage(id)} />
            )}
            {/* <IconButton variant="contained" sx={{ width: '32px', height: '32px' }} color="white" >
            <DeleteIcon />
          </IconButton> */}
          </Box>
        </Box>
      </Box>
    );
  }
  render() {
    return (
      <Box p={1.5} display={this.show ? 'true' : 'none'}>
        <Box>
          <MKTypography variant='h2' sx={{ fontSize: '16px' }}>
            {'Comments'}
          </MKTypography>
          <Box py={1} key={this.state.reloadEditor}>
            <TextEditor
              placeholder={'Add your own thoughts'}
              hideToolbar={true}
              onShowToolbar={() => this.setState({ writeOpen: true })}
              content={this.state.commentText}
              onChange={(html) => this.updateCommentText(html)}
            ></TextEditor>
          </Box>
          <Grid container justifyContent='space-between'>
            {this.state.charCount > this.maxLength * 0.5 ? (
              <MKTypography
                pl={1}
                variant='text1'
                color={
                  this.state.charCount > this.maxLength ? 'primary' : 'dark'
                }
                fontSize='16px'
              >
                {this.maxLength - this.state.charCount}
              </MKTypography>
            ) : (
              <Box />
            )}
            {this.state.writeOpen && (
              <Button
                onClick={this.sendComment}
                sx={{ borderRadius: '15px' }}
                variant='contained'
                endIcon={<Send />}
                color='white'
              >
                Send
              </Button>
            )}
          </Grid>
        </Box>
        <Box
          py={1}
          justifyContent={this.state.loadingState === 'loaded' ? '' : 'center'}
          display={this.state.loadingState === 'loaded' ? 'block' : 'flex'}
        >
          {this.state.loadingState === 'loading' ? (
            <PulseLoader color='black' speedMultiplier={1} size={8} />
          ) : this.state.loadingState === 'loaded' ? (
            this.state.comments && this.state.comments.length > 0 ? (
              this.state.comments
                .map((x, i) => [
                  this.drawCommentInstance(
                    i + 1,
                    x.id,
                    x.text,
                    x.likes,
                    x.author,
                    x.creationTime,
                    x.voted,
                    () => this.handleVote(x.id)
                  ),
                ])
                .join([
                  <MKBox
                    width='100%'
                    height='1.0px'
                    bgColor='#1e2e4a44'
                    my='auto'
                    sx={{}}
                    display='inline-block'
                  ></MKBox>,
                ])
            ) : (
              <Box width='100%' sx={{ textAlign: 'center' }}>
                {' '}
                <strong>No comments yet</strong>{' '}
              </Box>
            )
          ) : (
            <MKTypography>{this.state.loadingState}</MKTypography>
          )}
        </Box>
      </Box>
    );
  }
}
