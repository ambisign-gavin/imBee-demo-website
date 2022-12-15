import {
  AppBar,
  Container,
  IconButton,
  OutlinedInput,
  Toolbar,
} from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { searchBarAction } from 'src/redux/features/searchBar/slice'

const PageLayout = React.memo<React.PropsWithChildren<{}>>(({ children }) => {
  const dispatch = useDispatch()

  return (
    <>
      <AppBar>
        <Toolbar sx={{ py: 2 }}>
          <OutlinedInput
            size="small"
            sx={{
              mx: 'auto',
              maxWidth: '800px',
              width: '80%',
              background: '#F3F3F4',
              borderRadius: '50px',
              color: '#000',
            }}
            onChange={(e) => {
              dispatch(searchBarAction.setKeyword(e.target.value))
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}
            endAdornment={
              <IconButton>
                <SearchIcon
                  sx={{
                    color: '#8b8b93',
                  }}
                />
              </IconButton>
            }
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 2, mt: '8vh' }}>
        {children}
      </Container>
    </>
  )
})

export default PageLayout
