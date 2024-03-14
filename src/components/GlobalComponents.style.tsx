import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;  
    padding-top: 25px;
`

export const Page = styled.div`
    height: 100%;
    padding: 25px;
    margin-left: 23%;
`

export const Path = styled.p`
    color: #8A8B82;
    font-size: 12px;
    font-weight: bold;
`

export const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const TagFilter = styled.div`
    border: 1px solid ${(props) => props.color};
    margin-left: 5px;
    border-radius: 4px;
    padding: 3px 12px;
    color: ${(props) => props.color};
`

//Styling Modal 
export const BackgroundModal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0, 0, 0, 0.7);
    z-index: 1000;
`

export const ModalStyle = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius:8px;
`