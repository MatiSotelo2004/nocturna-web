import Item from "./Item"

export default function ItemList({productos}){
    return(<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((prod)=>(
            <Item key={prod.id}{...prod}/>
        ))}
    </div>)
}