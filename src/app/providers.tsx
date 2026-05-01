'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';

import theme from './theme';
import queryClient from './queryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    </>
}