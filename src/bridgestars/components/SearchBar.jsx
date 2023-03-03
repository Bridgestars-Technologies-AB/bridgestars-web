import { InputBase, Icon, IconButton } from '@mui/material'
import colors from 'assets/theme/base/colors';
const { dark } = colors;
import { useState } from 'react';

export default function SearchBar({
  placeholder = 'Search...',
  onSubmit = (value) => {},
  onChange = (value) => {},
  ...rest
}) {
  const [value, setValue] = useState("")
  return (
    <InputBase
      sx={{
        backgroundColor: '#f8f9fa',
        borderRadius: 3,
        px: `12px`,
        width: '100%',
        height: '42px',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '14px',
        fontFamily: '"Roboto Slab", sans-serif',
        color: dark.main,
        ...rest,
      }}
      onKeyPress={(e) => {
        if (e.code === 'Enter') {
          onSubmit(value);
        } 
      }}
      onChange={(e) => {
        e.stopPropagation()
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={'Search...'}
      endAdornment={
        <IconButton
          size='small'
          onClick={(e) => onSubmit(value)}
          sx={{
            backgroundColor: '#e8e9ea',
            '&:hover': {
              backgroundColor: '#d8d9da',
            },
          }}
        >
          <Icon style={{ color: dark.main }}>search</Icon>
        </IconButton>
      }
    />
  );
}