import classes from './AvailableDecorations.module.css'
import Card from "../UI/Card";
import DecoItem from "./DecoItem/DecoItem";
import {useEffect, useState} from "react";

// const DUMMY_DECORATIONS = [
//     {
//         id: 'd1',
//         name: 'Aloe vera',
//         description: 'An evergreen perennial, it grows wild in tropical, semi-tropical, and arid climates around the world.',
//         price: 4.99
//     },
//     {
//         id: 'd2',
//         name: 'Echeveria elegans',
//         description: 'The Mexican snow ball, Mexican gem or white Mexican rose is a species of flowering plant in the family Crassulaceae, native to semi-desert habitats in Mexico.',
//         price: 10.3
//     },
//     {
//         id: 'd3',
//         name: 'Hedgehog aloe',
//         description: 'Also known as spider aloe is a species of succulent plant in the genus Aloe.',
//         price: 12.99
//     },
//     {
//         id: 'd4',
//         name: 'Bunny ears cactus',
//         description: 'Opuntia microdasys is a species of flowering plant in the cactus family Cactaceae, native and endemic to central and northern Mexico.',
//         price: 6
//     }
// ]

function AvailableDecorations() {
    const [decorations, setDecorations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        async function fetchDecorations() {

            const response = await fetch('https://home-deco-app-default-rtdb.firebaseio.com/decorations.json');
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();

            const loadedDecorations = [];

            for (const key in responseData) {
                loadedDecorations.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }

            setDecorations(loadedDecorations);
            setIsLoading(false);
        }

        fetchDecorations().catch((err) => {
            setHttpError(err.message);
            setIsLoading(false);
        });

    }, [])

    if (isLoading) {
        return (
            <section className={classes.loadingDecorations}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.errorDecorations}>
                <h2>Error!</h2>
            </section>
        )
    }

    const decorationsList = decorations.map(decoration => <DecoItem key={decoration.id}
                                                                    itemName={decoration.name}
                                                                    itemDescription={decoration.description}
                                                                    itemPrice={decoration.price}
                                                                    itemId={decoration.id}/>);

    return (
        <section className={classes.decorations}>
            <Card>
                <ul>
                    {decorationsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableDecorations;