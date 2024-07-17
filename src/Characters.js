import React, { useState, useEffect, useRef } from 'react';
import bgImage from './bg.png';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        fetch('https://harry-potter-api-ebon.vercel.app/characters')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCharacters(data.characters);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    }, []);

    useEffect(() => {
        const options = {
          root: null, // viewport as root
          rootMargin: '0px', // no margin
          threshold: 0.5 // half of the item must be visible
        };
      
        const handleIntersection = (entries) => {
          entries.forEach(entry => {
            const cardIndex = cardRefs.current.findIndex(ref => ref === entry.target);
            if (cardIndex !== -1) {
              if (selectedCharacter && cardIndex === selectedCharacter.id) {
                // If this card is the selected character's card, keep opacity 1
                cardRefs.current[cardIndex].style.opacity = 1;
              } else {
                // For other cards, adjust opacity based on intersection
                cardRefs.current[cardIndex].style.opacity = entry.isIntersecting ? 1 : 0;
              }
            }
          });
        };
      
        const observer = new IntersectionObserver(handleIntersection, options);
      
        // Observe valid card elements
        cardRefs.current.forEach(cardRef => {
          if (cardRef && cardRef instanceof Element) {
            observer.observe(cardRef);
          }
        });
      
        return () => {
          observer.disconnect();
        };
      }, [characters, selectedCharacter]); // Rerun when characters or selectedCharacter change
      
    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const handleBackClick = () => {
        setSelectedCharacter(null);
    };

    const handleMouseEnter = (id) => {
        setHoveredCard(id);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
            {selectedCharacter ? (
                <div style={styles.broadView}>
                    <div style={styles.cardBroad}>
                        <img src={selectedCharacter.image} alt={selectedCharacter.name} style={styles.imageBroad} />
                        <div style={styles.details}>
                            <h2 style={styles.name}>{selectedCharacter.name}</h2>
                            {/* <p style={styles.description}><strong>Alternate Names:</strong> {selectedCharacter.alternate_names.join(', ')}</p> */}
                            <p style={styles.description}><strong>Species:</strong> {selectedCharacter.species}</p>
                            <p style={styles.description}><strong>Gender:</strong> {selectedCharacter.gender}</p>
                            <p style={styles.description}><strong>House:</strong> {selectedCharacter.house}</p>
                            <p style={styles.description}><strong>Date of Birth:</strong> {selectedCharacter.dateOfBirth}</p>
                            <p style={styles.description}><strong>Eye Colour:</strong> {selectedCharacter.eyeColour}</p>
                            <p style={styles.description}><strong>Hair Colour:</strong> {selectedCharacter.hairColour}</p>
                            <p style={styles.description}><strong>Patronus:</strong> {selectedCharacter.patronus}</p>
                            <p style={styles.description}><strong>Actor:</strong> {selectedCharacter.actor}</p>
                        </div>
                    </div>
                    <button style={styles.backButton} onClick={handleBackClick}>Go Back</button>
                </div>
            ) : (
                characters.map((character, index) =>
                    character.image !== "" && (
                        <div
                            key={character.id}
                            ref={ref => cardRefs.current[index] = ref}
                            style={hoveredCard === character.id ? { ...styles.card, ...styles.cardHover } : styles.card}
                            onClick={() => handleCardClick(character)}
                            onMouseEnter={() => handleMouseEnter(character.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={character.image} alt={character.name} style={styles.image} />
                            <div style={styles.details}>
                                <h2 style={styles.name}>{character.name}</h2>
                                {/* <p style={styles.description}><strong>Alternate Names:</strong> {character.alternate_names.join(', ')}</p> */}
                                <p style={styles.description}><strong>Species:</strong> {character.species}</p>
                                <p style={styles.description}><strong>Gender:</strong> {character.gender}</p>
                                <p style={styles.description}><strong>House:</strong> {character.house}</p>
                                <p style={styles.description}><strong>Date of Birth:</strong> {character.dateOfBirth}</p>
                                <p style={styles.description}><strong>Eye Colour:</strong> {character.eyeColour}</p>
                                <p style={styles.description}><strong>Hair Colour:</strong> {character.hairColour}</p>
                                <p style={styles.description}><strong>Patronus:</strong> {character.patronus}</p>
                                <p style={styles.description}><strong>Actor:</strong> {character.actor}</p>
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#1A1A1A', // Dark mystical background color
        color: '#fff', // Light text color for contrast
        fontFamily: 'Georgia, serif', // Mystical font style
    },
    card: {
        backgroundColor: '#2B2B2B', // Dark card background
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)', // Darker shadow
        margin: '20px',
        width: '300px',
        textAlign: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.3s, opacity 0.5s', // Added opacity transition
        border: '1px solid #444', // Slightly darker border
        opacity: 0, // Initially hidden
    },
    cardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.6)', // Even darker shadow
        borderColor: '#6C757D', // Wizardy border color
    },
    cardBroad: {
        backgroundColor: '#2B2B2B', // Dark broad view background
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)', // Darker shadow
        margin: '20px',
        width: '600px',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '20px',
    },
    image: {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0', // Rounded corners for the image
    },
    imageBroad: {
        width: '100%',
        height: '800px',
        objectFit: 'cover',
        borderRadius: '8px', // Rounded corners for the image
    },
    details: {
        padding: '20px',
    },
    name: {
        fontSize: '1.5em',
        margin: '10px 0',
        color: '#FFD700', // Gold text color for name
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)', // Darker text shadow
    },
    description: {
        fontSize: '1em',
        margin: '5px 0',
        color: '#ccc', // Lighter description text color
    },
    broadView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        fontFamily: 'Georgia, serif', // Mystical font style for the button
        textTransform: 'uppercase', // Uppercase text
        boxShadow: '0 4px 8px rgba(0,0,0,0.4)', // Button shadow
        transition: 'background-color 0.3s', // Smooth background transition
    },
};

export default Characters;
