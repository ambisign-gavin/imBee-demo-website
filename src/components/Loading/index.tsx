import { keyframes } from '@emotion/react'
import RefreshIcon from '@mui/icons-material/Refresh'
import { SvgIconProps } from '@mui/material'

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`

const Loading = ({ sx, ...others }: SvgIconProps) => (
  <RefreshIcon
    sx={{
      fontSize: '5rem',
      ...sx,
      mx: 'auto',
      animation: `${rotate} 2s linear infinite `,
    }}
    {...others}
  />
)

export default Loading
