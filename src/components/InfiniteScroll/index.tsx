import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Loading from 'src/components/Loading'

type IInfiniteScrollProps = {
  hasMore?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
}

const InfiniteScroll = React.memo<
  React.PropsWithChildren<IInfiniteScrollProps>
>((props) => {
  const { children, onLoadMore, isLoading, hasMore } = props

  const triggerRef = React.useRef(null)
  const onLoadMoreCallbackRef = React.useRef(onLoadMore)
  const hasMoreRef = React.useRef(hasMore)
  const isLoadingRef = React.useRef(isLoading)

  React.useEffect(() => {
    onLoadMoreCallbackRef.current = onLoadMore
  }, [onLoadMore])

  React.useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  React.useEffect(() => {
    isLoadingRef.current = isLoading
  }, [isLoading])

  React.useEffect(() => {
    if (!triggerRef.current) {
      return
    }
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries.length === 0) {
        return
      }
      if (isLoadingRef.current) {
        return
      }
      if (!hasMoreRef.current) {
        return
      }
      const entry = entries[0]
      if (!entry.isIntersecting) {
        return
      }
      onLoadMoreCallbackRef.current && onLoadMoreCallbackRef.current()
    }
    const el = triggerRef.current
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.4],
    })
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [])

  return (
    <Stack>
      {children}
      <Box
        ref={triggerRef}
        sx={{
          height: '50px',
          width: 1,
          textAlign: 'center',
        }}
      >
        {hasMore ? (
          isLoading ? (
            <Loading />
          ) : null
        ) : (
          <Typography>已顯示所有資料</Typography>
        )}
      </Box>
    </Stack>
  )
})

export default InfiniteScroll
