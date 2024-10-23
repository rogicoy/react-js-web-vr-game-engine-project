/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError() as {
    statusText?: string;
    message?: string;
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        blockSize: '100dvh',
        inlineSize: '100dvw'
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center'
          }}
        >
          An upexpected error occurred.
        </Typography>
        <Typography
          variant="subtitle2"
          component="p"
          sx={(theme) => ({
            color: theme.palette.grey[700],
            textAlign: 'center',
            fontSize: '1.5rem'
          })}
        >
          <i>{error?.statusText ?? error?.message}</i>
        </Typography>
      </Grid>
    </Grid>
  );
}
