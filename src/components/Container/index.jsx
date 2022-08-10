import React, { useEffect, useState } from 'react'
import Board from '../Board'
import './Container.css'

const Container = () => {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetch('http://localhost:9000/api/board')
    .then(res => res.json())
    .then(data => setBoards(data))
  }, [])

  return (
    <div className="container">
        {
          boards.map(board => 
          <Board
            key = {board._id}
            id = {board._id}
            name = {board.name}
            listIDs = {board.listIDs}
          />)
        }
    </div>
  )
}

export default Container