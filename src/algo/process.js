const sizeMap = { height: 6, width: 16 }

const moveOnSquare = (char, location) => {
  const tmp = { ...location }
  if (char === 'D') tmp.x += 1
  else if (char === 'G') tmp.x -= 1
  else if (char === 'H') tmp.y -= 1
  else if (char === 'B') tmp.y += 1
  else return tmp

  // 0
  if (tmp.x > sizeMap.width) tmp.x = 0
  if (tmp.y > sizeMap.height) tmp.y = 0

  // sizeMap
  if (tmp.x < 0) tmp.x = sizeMap.width
  if (tmp.y < 0) tmp.y = sizeMap.height
  //
  return tmp
}

const checkIfForbiden = (arrayPositionForbidden, testPosition) => {
  return arrayPositionForbidden.find(
    (e) => e.x === testPosition.x && e.y === testPosition.y,
  )
}

const process = (sizeSnake, strMove) => {
  const currentLocation = { x: sizeSnake - 1, y: 0 }
  const arrayMove = strMove.split('')

  const positionForbidden = []
  for (let i = 0; i < sizeSnake; i++) {
    positionForbidden[i] = { x: i, y: 0 }
  }

  for (let i = 0; i < arrayMove.length; i++) {
    const newLocation = moveOnSquare(arrayMove[i], currentLocation)
    if (!checkIfForbiden(positionForbidden, newLocation)) {
      // update location
      currentLocation.x = newLocation.x
      currentLocation.y = newLocation.y
      // update forbidden
      positionForbidden.shift() // remove first elemt in array
      positionForbidden.push(newLocation) // add new location
    }
  }

  return currentLocation
}

console.log(process(10, 'DDDDBBDDDDDDDDDDDDDDDD'))
