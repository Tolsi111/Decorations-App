import classes from './AvailableDecorations.module.css'
import Card from "../UI/Card";
import DecoItem from "./DecoItem/DecoItem";

const DUMMY_DECORATIONS = [
    {
        id: 'd1',
        name: 'Aloe vera',
        description: 'An evergreen perennial, it grows wild in tropical, semi-tropical, and arid climates around the world.',
        price: 4.99
    },
    {
        id: 'd2',
        name: 'Echeveria elegans',
        description: 'The Mexican snow ball, Mexican gem or white Mexican rose is a species of flowering plant in the family Crassulaceae, native to semi-desert habitats in Mexico.',
        price: 10.3
    },
    {
        id: 'd3',
        name: 'Hedgehog aloe',
        description: 'Also known as spider aloe is a species of succulent plant in the genus Aloe.',
        price: 12.99
    },
    {
        id: 'd4',
        name: 'Bunny ears cactus',
        description: 'Opuntia microdasys is a species of flowering plant in the cactus family Cactaceae, native and endemic to central and northern Mexico.',
        price: 6
    }
]

function AvailableDecorations() {
    const decorationsList = DUMMY_DECORATIONS.map(decoration => <DecoItem key={decoration.id}
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