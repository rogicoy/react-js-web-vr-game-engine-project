/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import AuthenticationController from 'auth';
import { LogoutIcon } from 'images/icons';
import styles from 'images/icons/styles.module.css';

export default function CanvasLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      container
      sx={{
        blockSize: '100dvh',
        maxBlockSize: '100dvh',
        inlineSize: '100dvw',
        maxInlineSize: '100dvw',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#070705',
        color: 'white'
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          position: 'absolute',
          blockSize: 'auto',
          insetInlineEnd: 0,
          paddingBlock: '0.5rem',
          paddingInline: '1rem',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <LogoutIcon
          onClick={AuthenticationController.doLogout}
          className={styles.iconBorder}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          blockSize: '100%',
          textAlign: 'center',
          '& :focus-visible, & :focus': {
            outline: 'none'
          }
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}
