import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {ProfilePage} from "./pages/Profile";
import {MainPage} from "./pages/Main";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}