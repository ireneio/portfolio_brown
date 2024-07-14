"use client";

import React, { createContext, useContext } from 'react';

const RouteParamsContext = createContext<Record<any, any>>({});

export const RouteParamsProvider = ({ children, params }: { children: JSX.Element, params: Record<any, any> }) => {
  return (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  );
};

export const useRouteParams = () => useContext(RouteParamsContext);
