import React, { useState } from "react";
import { matchRoutes, useLocation } from "react-router-dom"

const useCurrentPath = () => {
    const [routes, setRoutes] = useState()
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location)

    return route.path
}

