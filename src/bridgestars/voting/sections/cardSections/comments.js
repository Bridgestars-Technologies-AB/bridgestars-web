// SCROLLBAR


import { Component } from 'react';
//MUI
import { Box, Card, Grid } from '@mui/material';

//OTIS KIT
import MKTypography from 'otis/MKTypography';

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
  }

  constructor({ post, show, outerState, setOuterState }) {
    super()
    this.post = post
    this.show = show
    if (outerState && outerState != {}) {
      this.state = outerState
    }
    this.setOuterState = setOuterState
  }

  //on mount metthod
  componentDidMount() {
    if (this.state.loadingState != 'loaded') {
      console.log("loading comments")
      this.loadComments();
    }
  }
  componentWillUnmount() {
    this.setOuterState(this.state)
  }
  async getComments() {
    try {
      const chat = this.post.get("chat")
      if (chat) {
        const messages = await new Parse.Query("Message")
          .equalTo("chat", chat)
          .select("text", "reactions", "sender")
          .find()
        console.log("messages:" + JSON.stringify(messages.map(m => m.get("text"))))
        const authors = await new Parse.Query("_User")
          .containedIn("objectId", messages.map(m => m.get("sender")))
          .select("dispName", "img")
          .find();
        // console.log("authors:" + JSON.stringify(authors))

        const votes = await new Parse.Query("Reaction")
          .equalTo("user", Parse.User.current()?.id)
          .containedIn("target", messages.map(m => m.id))
          .equalTo("type", 2)
          .select("target")
          .find();

        if (messages && authors) {
          const comments = messages.map((m, i) => {
            return {
              likes: m.get("reactions")["1"] ?? 0,
              text: m.get("text"),
              author: authors.find(a => a.id == m.get("sender")),
              creationTime: m.createdAt,
              voted: votes.filter(v => v.get("target") == m.id).length > 0,
              id: m.id
            }
          })
          return comments
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  }


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
  }

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
    const comments = this.state.comments;
    const updateDocLocal = async (inc) => {
      const incr = (doc) => {
        doc.likes += inc;
        doc.voted = !doc.voted;
        return doc;
      };
      this.setState({ comments: comments.map((doc) => (doc.id == commentId ? incr(doc) : doc)) });
    };
    if (Parse.User.current() && comments != null) {
      const comment = comments.find((c) => c.id == commentId);
      if (!comment) throw new Error("Comment not found");
      if (comment.voted) {
        //local
        updateDocLocal(-1)
        var reactions = await new Parse.Query("Reaction")
          .equalTo("type", 2)
          .equalTo("target", commentId)
          .equalTo("user", Parse.User.current().id)
          .find()
        if (reactions) await Parse.Object.destroyAll(reactions)
      } else {
        //local
        updateDocLocal(1)
        await new Parse.Object("Reaction", { data: 1, type: 2, target: commentId }).save()
      }
    } else {
      setShowSignin(true);
    }
  }


  render() {
    return (
      <Box p={1.5} display={this.show ? 'true' : 'none'}>
        <Box>
          <MKTypography variant='h2' sx={{ fontSize: '16px' }}>
            {'Comments'}
          </MKTypography>
          <Box py={1}>
            {!this.state.writeOpen ?
              <TextEditor
                placeholder={'Add your own thoughts'}
                content={this.state.commentText}
                onChange={(html) => this.updateCommentText(html)}
              ></TextEditor>
              :
              <></>
            }
          </Box>
          {this.state.charCount > 0 ? (
            <Grid container justifyContent='flex-end'>
              <MKTypography
                variant='text1'
                color={this.state.charCount > 750 ? 'primary' : 'dark'}
                fontSize='16px'
              >
                {'Character count: ' + this.state.charCount + '/750'}
              </MKTypography>
            </Grid>
          ) : (
            <></>
          )}
        </Box>
        <Box
          py={1}
          justifyContent={this.state.loadingState === 'loaded' ? '' : 'center'}
          display='flex'
        >
          {this.state.loadingState === 'loading' ? (
            <PulseLoader color='black' speedMultiplier={1} size={8} />
          ) : this.state.loadingState === 'loaded' ? (
            this.state.comments.map((x) =>
              drawCommentInstance(
                x.text,
                x.likes,
                x.author,
                x.creationTime,
                x.voted,
                () => this.handleVote(x.id)
              )
            )
          ) : (
            <MKTypography>{this.state.loadingState}</MKTypography>
          )}
        </Box>
      </Box>
    )
  }
}





function drawCommentInstance(text, likes, author, creationTime, voted, handleVote) {
  return (
    <Box key={text} mx={1} display='flex'>
      <Box width='min-content' mt={0.3}>
        {drawXSVoter(voted, likes, handleVote)}
      </Box>
      <Box width='100%'>
        <TextEditor
          placeholder={'comment'}
          readOnly={true}
          theme='bubble'
          content={text}
        />
        <Box mx={1.5} mt={0.5}>
          {drawAuthor(author, creationTime)}
        </Box>
      </Box>
    </Box>
  );
}