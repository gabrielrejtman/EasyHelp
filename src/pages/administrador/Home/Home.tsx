import styled from 'styled-components'
import { Page, Path, Title } from '../../../components/GlobalComponents.style'

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`

const DashboardItem = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 426px;
  height: 251px;
  font-weight: 600;
  font-size: 16px;
`

function Home() {
  return (
      <Page>
        <div>
          <Path>Home</Path>
          <Title>Dashboards</Title>


          <DashboardGrid>
            <DashboardItem>Ocorrências mais registradas</DashboardItem>
            <DashboardItem>Problemas mais frequentes</DashboardItem>
            <DashboardItem>Setores com mais problemas</DashboardItem>
            <DashboardItem>Avaliações</DashboardItem>
          </DashboardGrid>
        </div>
      </Page>
  )
}

export default Home
