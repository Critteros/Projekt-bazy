import { Avatar } from '@mui/material';
import { useMemo, memo } from 'react';

type ColorAvatarProps = {
  value: string;
};

export const ColorAvatar = memo(function ColorAvatar({ value }: ColorAvatarProps) {
  const bgcolor = useMemo(() => {
    const hash = [...value].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${hash % 360}, 95%, 35%)`;
  }, [value]);

  return (
    <Avatar
      sx={{
        bgcolor,
        color: 'white',
      }}
    >
      {value[0]}
    </Avatar>
  );
});
