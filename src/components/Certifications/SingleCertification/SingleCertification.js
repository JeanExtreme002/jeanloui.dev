import React from 'react';
import placeholder from '../../../assets/png/placeholder.png';
import Fade from 'react-reveal/Fade';
import './SingleCertification.css';

function SingleCertification({ id, image, url, institution, theme, description }) {

    return (
        <Fade bottom>
            <div>
                <a href={url} target="_blank" without rel="noreferrer">
                    <div
                        key={id}
                        className='singleCertification'
                        style={{ backgroundColor: theme.primary400 }}
                    >
                        <div className='certificationContent'>
                            <h2 style={{ color: theme.tertiary }}>{institution}'s Certificate</h2>
                            <img src={image ? image : placeholder} alt="Certification"/>
                        </div>
                        <p
                            className='certification--desc'
                            style={{
                                background: theme.secondary,
                                color: theme.tertiary,
                            }}
                        >
                            {description}
                        </p>
                    </div>
                </a>
            </div>
        </Fade>
    );
}

export default SingleCertification;
