import { Avatar, AvatarProps, Skeleton } from '@mui/material'
import React from 'react'

type ILazyStatus = 'Waiting' | 'Loading' | 'Fetched'

const LazyAvatar = (props: AvatarProps) => {
  const { imgProps, sx, src, ...others } = props

  const triggerRef = React.useRef(null)

  const [loadStatus, setLoadStatus] = React.useState<ILazyStatus>('Waiting')

  React.useEffect(() => {
    if (!triggerRef.current) {
      return
    }
    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries.length === 0) {
        return
      }
      const entry = entries[0]
      if (!entry.isIntersecting) {
        return
      }
      setLoadStatus('Loading')
      observer.unobserve(entry.target)
    }
    const el = triggerRef.current
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1],
    })
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [])

  return (
    <>
      {loadStatus !== 'Fetched' ? (
        <Skeleton sx={{ aspectRatio: '1' }} variant="circular">
          <Avatar sx={sx} ref={triggerRef} {...others} />
        </Skeleton>
      ) : null}
      {loadStatus !== 'Waiting' ? (
        <Avatar
          imgProps={{
            referrerPolicy: 'no-referrer',
            onLoad: () => setLoadStatus('Fetched'),
            onError: () => setLoadStatus('Fetched'),
          }}
          sx={[
            ...(Array.isArray(sx) ? sx : [sx]),
            (theme) => ({
              outline: `3px solid ${theme.palette.primary.main}`,
              display: loadStatus !== 'Fetched' ? 'none' : 'inline-flex',
            }),
          ]}
          src={src}
          {...others}
        />
      ) : null}
    </>
  )
}

export default LazyAvatar
