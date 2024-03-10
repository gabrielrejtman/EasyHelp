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
  width: 480px;
  height: 280px;
`

function Home() {
  return (
      <div>
          <Page>
            <Path>Home</Path>
            <Title>Dashboards</Title>


            <DashboardGrid>
              <DashboardItem>Ocorrências mais registradas</DashboardItem>
              <DashboardItem>Problemas mais frequentes</DashboardItem>
              <DashboardItem>Setores com mais problemas</DashboardItem>
              <DashboardItem>Avaliações</DashboardItem>
            </DashboardGrid>
          </Page>
      </div>
  )
}

export default Home
