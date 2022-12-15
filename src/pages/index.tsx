import { Box } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import PageLayout from 'src/components/PageLayout'
import QuestionList from 'src/components/QuestionList'
import Tags from 'src/components/Tags'

const Home: NextPage = React.memo(() => {
  return (
    <PageLayout>
      <Tags />
      <Box sx={{ mt: 2 }}>
        <QuestionList />
      </Box>
    </PageLayout>
  )
})

export default Home
