import React,{ useContext} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { ThemeContext } from '../../contexts/ThemeContext';
import { certificationsBio, certificationsData } from '../../data/certificationsData'
import { HiArrowRight } from "react-icons/hi";

import './Certifications.css'
import SingleCertification from './SingleCertification/SingleCertification';

function Certifications() {

    const { theme } = useContext(ThemeContext);

    
    const useStyles = makeStyles(() => ({
        viewAllBtn : {
            color: theme.tertiary, 
            backgroundColor: theme.primary,
            transition: 'color 0.2s',
            "&:hover": {
                color: theme.secondary, 
                backgroundColor: theme.primary,
            }
        },
        viewArr : {
            color: theme.tertiary, 
            backgroundColor: theme.secondary70,
            width: '40px',
            height: '40px',
            padding: '0.5rem',
            fontSize: '1.05rem',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            "&:hover": {
                color: theme.tertiary, 
                backgroundColor: theme.secondary,
            }
        },
    }));

    const classes = useStyles();

    return (
        <>
            {certificationsData.length > 0 && (
                <div className="certifications" id="certifications" style={{backgroundColor: theme.secondary}}>
                    <div className="certifications--header">
                        <h1 style={{color: theme.primary}}>Certifications</h1>
                        <h4 style={{color:theme.tertiary}}>{certificationsBio}</h4>
                    </div>
                    <div className="certifications--body">
                        <div className="certifications--bodyContainer">
                            {certificationsData.slice(0, 3).map(certification => (
                                <SingleCertification
                                    theme={theme}
                                    key={certification.id}
                                    id={certification.id}
                                    url={certification.url}
                                    institution={certification.institution}
                                    image={certification.image}
                                />
                            ))}
                        </div>
                        <br/><br/>
                        <div className="certifications--bodyContainer">
                            {certificationsData.slice(3, 6).map(certification => (
                                <SingleCertification
                                    theme={theme}
                                    key={certification.id}
                                    id={certification.id}
                                    url={certification.url}
                                    institution={certification.institution}
                                    image={certification.image}
                                />
                            ))}
                        </div>  

                        {certificationsData.length > 3 && (
                            <div className="certifications--viewAll">
                                <Link to="/certifications">
                                    <button className={classes.viewAllBtn}>
                                        View All
                                        <HiArrowRight className={classes.viewArr} />
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </>
    )
}

export default Certifications;
