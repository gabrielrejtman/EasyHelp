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