import { useState } from 'react'
import animals from './animals'

function App() {
  const [wichAnimal, setAnimal] = useState({
    name: '',
    author: '',
    id: '',
    dontKnow: '',
  })
  const [animalsList, setAnimalList] = useState(animals)

  //add element
  const handleFormField = (fieldName, value) => {
    setAnimal(currentAnimal => {
      return { ...currentAnimal, [fieldName]: value }
    })
    console.log(wichAnimal)
  }
  const handleSubmit = e => {
    e.preventDefault()

    console.log(animalsList.length !== 0)
    if (animalsList.length !== 0) {
      setAnimalList(currentState => [...currentState, wichAnimal])
    } else
      setAnimalList([
        { id: 1, name: wichAnimal.name, author: wichAnimal.author },
      ])

    setAnimal({ name: '', author: '', id: '' })
  }

  //remove element
  const removeAnimal = id => {
    setAnimalList(
      animalsList.filter(elem => {
        return elem.id !== id
      }),
    )
  }
  //move element
  const handleMove = (index, move) => {
    //deep copy
    let newAnima = JSON.parse(JSON.stringify(animalsList))
    if (index === 0 && move) return
    else if (index === animalsList.length - 1 && !move) return
    else if (move) {
      let tmp = newAnima[index - 1]
      newAnima[index - 1] = newAnima[index]
      newAnima[index] = tmp
    } else if (!move) {
      let tmp = newAnima[index + 1]
      newAnima[index + 1] = newAnima[index]
      newAnima[index] = tmp
    } else return
    setAnimalList(newAnima)
  }
  return (
    <>
      <div className='mx-auto my-4 w-md'>
        <ul className='my-2 border text-slate-200'>
          {animalsList.map((elem, index) => {
            let isEven = elem.id % 2
            return (
              <li key={elem.id} className='columns-5 px-2 py-1'>
                <div className='text-black'> {elem.name}</div>
                <div className='text-black'>{elem.author}</div>
                <div className='text-black'>{elem.dontKnow}</div>

                <div>
                  <button
                    className='color-red on border px-3 font-black text-red-600 hover:bg-slate-200'
                    onClick={() => removeAnimal(elem.id)}
                  >
                    X
                  </button>
                </div>
                <div className='columns-4 text-left'>
                  <button
                    className='text-black'
                    onClick={() => handleMove(index, true)}
                  >
                    <i className='fa-solid fa-arrow-up'></i>
                  </button>
                  <button
                    className='text-black'
                    onClick={() => handleMove(index, false)}
                  >
                    <i className='fa-solid fa-arrow-down'></i>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            className='my-4 border px-1 text-emerald-800'
            name='name'
            type='text'
            value={wichAnimal.name}
            onChange={event => {
              handleFormField('name', event.target.value)
            }}
          />
          <input
            className='my-4 border px-1 text-emerald-800'
            name='author'
            type='text'
            value={wichAnimal.author}
            onChange={event => {
              handleFormField('author', event.target.value)
            }}
          />
          <select
            name='dontKnow'
            onChange={event => {
              handleFormField('dontKnow', event.target.value)
            }}
          >
            <option value='FrontEnd'>FrontEnd</option>
            <option value='BackEnd'>BackEnd</option>
            <option value='UI/UX'>UI/UX</option>
          </select>
          <button
            type='submit'
            className='mx-1 border-1 px-4 text-slate-900 hover:border-2'
          >
            Aggiungi
          </button>
        </form>
      </div>
    </>
  )
}

export default App
