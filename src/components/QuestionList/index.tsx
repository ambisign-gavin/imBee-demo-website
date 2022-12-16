import React from 'react'
import {
  Badge,
  BadgeProps,
  Box,
  Link,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import { useLazyGetInfiniteScrollQuestionsQuery } from 'src/redux/apis/questions/api'
import DoneIcon from '@mui/icons-material/Done'
import InfiniteScroll from 'src/components/InfiniteScroll'
import { useSelector } from 'react-redux'
import { IRootState } from 'src/redux/store'
import LazyAvatar from 'src/components/LazyAvatar'
import he from 'he'

const QuestionInfoBadge = (props: {
  badgeProps?: BadgeProps
  sx?: SxProps<Theme>
  title: number
  subtitle: string
}) => {
  const { badgeProps, sx, title, subtitle } = props

  return (
    <Badge {...badgeProps} sx={{ mr: 2, ...badgeProps?.sx, mt: 1 }}>
      <Stack
        display="inline-flex"
        direction="row"
        alignItems="flex-end"
        sx={[
          (theme) => ({
            px: 1,
            backgroundColor: theme.palette.grey[300],
            borderRadius: '15px',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Typography variant="subtitle2" pb="2px">
          {subtitle}:
        </Typography>
        <Typography variant="subtitle1" mx={0.5}>
          {title}
        </Typography>
      </Stack>
    </Badge>
  )
}

const QuestionList = () => {
  const selectedTag = useSelector((state: IRootState) => state.tags.selectedTag)

  const {
    fetchNext,
    isFetching,
    dataSource: questions,
    data,
  } = useLazyGetInfiniteScrollQuestionsQuery()

  React.useEffect(() => {
    if (!selectedTag) {
      return
    }
    fetchNext({ tag: selectedTag }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag])

  return (
    <InfiniteScroll
      hasMore={data?.hasMore || true}
      isLoading={isFetching}
      onLoadMore={() => {
        if (questions.length === 0) {
          return
        }
        if (!selectedTag) {
          return
        }
        fetchNext({ tag: selectedTag })
      }}
    >
      {questions?.map((question) => (
        <Paper
          key={question.question_id}
          elevation={5}
          sx={{
            mb: 3,
            borderRadius: '10px',
            pt: {
              xs: '20px',
              sm: 0,
            },
            position: 'relative',
          }}
        >
          <Stack direction="row">
            <Box flex={8} sx={{ p: 2 }}>
              <Link
                href={question.link}
                underline="hover"
                target="_blank"
                rel="noreferrer"
              >
                <Typography
                  variant="h6"
                  sx={{
                    wordBreak: 'break-word',
                  }}
                >
                  {he.decode(question.title)}
                </Typography>
              </Link>
              <Stack direction="row" sx={{ mt: 1 }}>
                <QuestionInfoBadge
                  title={question.score}
                  subtitle="score"
                  sx={(theme) => ({
                    outlineColor: theme.palette.error.main,
                    outlineStyle: 'solid',
                    outlineWidth: question.score < 0 ? '3px' : '0px',
                  })}
                />
                <QuestionInfoBadge
                  title={question.view_count}
                  subtitle="views"
                />
                <QuestionInfoBadge
                  badgeProps={
                    question.is_answered
                      ? {
                          badgeContent: (
                            <DoneIcon sx={{ fontSize: '0.9rem' }} />
                          ),
                          color: 'success',
                        }
                      : undefined
                  }
                  sx={(theme) => ({
                    outlineColor: theme.palette.success.main,
                    outlineStyle: 'solid',
                    outlineWidth: question.answer_count > 0 ? '3px' : '0px',
                  })}
                  title={question.answer_count}
                  subtitle="answers"
                />
              </Stack>
            </Box>
            <Stack
              justifyContent="center"
              alignItems="center"
              flexDirection={{
                xs: 'row-reverse',
                sm: 'column',
              }}
              flex={1}
              sx={{
                position: {
                  xs: 'absolute',
                  sm: 'static',
                },
                top: '-10px',
                right: 0,
              }}
            >
              <LazyAvatar
                imgProps={{
                  loading: 'lazy',
                }}
                sx={{
                  height: {
                    xs: '40px',
                    sm: '70px',
                  },
                  width: {
                    xs: '40px',
                    sm: '70px',
                  },
                }}
                src={question.owner.profile_image}
              />
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: '125px',
                }}
                mt={{
                  xs: 0,
                  sm: 0.5,
                }}
                mr={{
                  xs: 1,
                  sm: 0,
                }}
              >
                {he.decode(question.owner.display_name)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </InfiniteScroll>
  )
}

export default QuestionList
