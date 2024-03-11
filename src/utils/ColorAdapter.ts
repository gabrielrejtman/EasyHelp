export const handleColorDificult = (item : string | undefined) => {

    switch(item){

        case "fácil":
            return "#4A83D1"
        case "médio":
            return "#E79E30"
        case "difícil":
            return "#E25B55"
        default:
            return "#E25B55"
    }

}