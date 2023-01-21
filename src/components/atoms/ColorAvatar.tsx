import { Avatar, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { stringToColor } from '@/utils/stringToColor';

type ColorAvatarProps = {
  value: string;
};

export const ColorAvatar = ({ value }: ColorAvatarProps) => {
  const [colorValue, setColorValue] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setColorValue(await stringToColor(value));
    })();
  }, [value]);

  if (colorValue === null) {
    return <Skeleton variant={'circular'} width={40} height={40} />;
  }

  return (
    <Avatar
      sx={{
        bgcolor: colorValue,
        color: 'white',
      }}
    >
      {value[0]}
    </Avatar>
  );
};
