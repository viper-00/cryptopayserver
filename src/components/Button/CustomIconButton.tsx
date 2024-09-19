import { IconButton } from '@mui/material';
import { useState } from 'react';

type Props = {
  width?: string;
  colorScheme?: string;
  variant?: string;
  textAlign?: 'left' | 'center' | 'right';
  onClick?: () => Promise<void>;
  icon?: any;
  size?: string;
  isDisabled?: boolean;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
};

const CustomIconButton = (props: Props) => {
  const { size, width, variant, onClick, textAlign, icon, isDisabled, color, backgroundColor, borderRadius } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (onClick) {
      await onClick();
    }
    setIsLoading(false);
  };
  
  return (
    <IconButton
      // aria-label={'icon button'}
      // color={color}
      // backgroundColor={backgroundColor}
      // textAlign={textAlign || 'left'}
      // width={width || 'auto'}
      // variant={variant || 'solid'}
      // size={size || 'md'}
      // isLoading={isLoading}
      // isDisabled={isDisabled || false}
      onClick={handleClick}
      // icon={icon}
      // borderRadius={borderRadius}
    />
  );
};

export default CustomIconButton;
