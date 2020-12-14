import React from 'react'
import {Link} from 'react-router-dom'

export const AboutPage: React.FC = () => {
    return (
        <>
            <h1>Страница информации</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nostrum
                vero, repudiandae expedita beatae iure? Mollitia tempore quae qui
                voluptatum.
            </p>
            <Link to='/'>
                <button className="btn">
                    Обратно к списку дел
                </button>
            </Link>
        </>
    )
}
