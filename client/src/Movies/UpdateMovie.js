import React, { useState } from 'react';
import axios from 'axios';


export const UpdateMovie = props => {
    const [newMovie, setNewMovie] = useState({
        id: props.history.location.pathname.slice(-1),
        title: '',
        director: '',
        metascore: '',
        stars: '',
    })
   
    console.log('newMovie state at initial load is: ', newMovie)

    const handleInput = (e) => {
        console.log('name here is: ', e.target.name)
        console.log('value here is: ', e.target.value)

        const {name, value} = e.target
        setNewMovie({
            ...newMovie,
            [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('newMovie state is: ', newMovie)
        console.log('newMovie.id state is: ', newMovie.id)
       
        axios
          .put(`http://localhost:5000/update-movie/${newMovie.id}`, newMovie)
          .then(res => {
            props.addToSavedList(res.data);
            props.history.push(`/movies/${newMovie.id}`);
            return setNewMovie({
                id: newMovie.id,
                title: '',
                director: '',
                metascore: 0,
                stars: [],
            })
          })
          .catch(err => console.log(err));
      };
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                Movie title:
                        <input
                        type="text"
                        name="title"
                        value={newMovie.title}
                        onChange={handleInput}
                    />
                </label>
                <label>
                Movie Director:
                        <input
                        type="text"
                        name="Director"
                        value={newMovie.Director}
                        onChange={handleInput}
                    />
                </label>
                <label>
                Movie metascore:
                        <input
                        type="text"
                        name="metascore"
                        value={newMovie.metascore}
                        onChange={handleInput}
                    />
                </label>
                <label>
                Movie stars:
                        <input
                        type="text"
                        name="stars"
                        value={newMovie.stars}
                        onChange={handleInput}
                    />
                </label>
                <button>Update Movie</button>
            </form>
        </div>
    )
}