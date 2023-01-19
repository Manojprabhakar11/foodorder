import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FoodOrder from "../screens/FoodOrder"
export default function AppRoute() {
    return (
        <Routes>
            <Route path="/foodorder" element={<FoodOrder/>}></Route>
            <Route path="/" element={<FoodOrder/>}></Route>
        </Routes>
    )
}
