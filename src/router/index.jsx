import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Weather from '../pages/Weather'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </Router>
  )
}
