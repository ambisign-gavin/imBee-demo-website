import { Box, Chip, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tagsAction } from 'src/redux/features/tags/slice'
import { useGetTagsQuery } from 'src/redux/apis/tags/api'
import { IRootState } from 'src/redux/store'
import Loading from 'src/components/Loading'

const Tags = () => {
  const [selectedTag, keyword] = useSelector((state: IRootState) => [
    state.tags.selectedTag,
    state.searchBar.keyword,
  ])

  const { data: tags, isFetching } = useGetTagsQuery(keyword || '')

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!tags || tags.length === 0) {
      return
    }
    dispatch(tagsAction.setSelectedTag(tags[0].name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  return (
    <Box width={1} overflow={isFetching ? 'none' : 'auto'}>
      <Stack
        direction="row"
        sx={{
          flexWrap: 'nowrap',
        }}
      >
        {isFetching ? (
          <Loading sx={{ fontSize: '2rem' }} />
        ) : (
          tags?.map((tag) => (
            <Chip
              sx={{
                mx: 1,
                fontSize: '1.05rem',
                cursor: 'pointer',
                backgroundColor: '#fff',
                color: 'primary.main',
                fontWeight: 'bold',
                my: 1,
                outline:
                  selectedTag === tag.name
                    ? '5px solid #ffc947'
                    : '1px solid #276678',
              }}
              key={tag.name}
              label={tag.name}
              onClick={() => {
                dispatch(tagsAction.setSelectedTag(tag.name))
              }}
            />
          ))
        )}
      </Stack>
    </Box>
  )
}

export default Tags
