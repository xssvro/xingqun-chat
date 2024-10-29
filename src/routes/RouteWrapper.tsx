// src/components/RouteWrapper.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routeConfig from '../routes';

const RouteWrapper: React.FC = () => {
    return (
        <Routes>
            {routeConfig.map(({ path, component: Component, layout: Layout }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Layout>
                            <Component />
                        </Layout>
                    }
                />
            ))}
        </Routes>
    );
};

export default RouteWrapper;