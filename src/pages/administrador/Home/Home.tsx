import React from 'react';
import './styles.css'
import styled from 'styled-components';

const Page = styled.div`
  padding: 20px;
  margin-left: 45px; 
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`

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
      <Page>
        <a>Home</a>
        <Title>Dashboards</Title>


        <DashboardGrid>
          <DashboardItem>Ocorrências mais registradas</DashboardItem>
          <DashboardItem>Problemas mais frequentes</DashboardItem>
          <DashboardItem>Setores com mais problemas</DashboardItem>
          <DashboardItem>Avaliações</DashboardItem>
        </DashboardGrid>
      </Page>
  );
}

export default Home;

