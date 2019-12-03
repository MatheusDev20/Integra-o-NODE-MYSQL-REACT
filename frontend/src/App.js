import React,{Component} from 'react';
import axios from 'axios'
import edit from './assets/edit.png'
import delet from './assets/delete.png'
import {
  Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup, Label, Input
} from 'reactstrap'


class App extends Component  {
  state = {
    dados:[],
    dadosBicas: [],
    dadosJf: [],
    newDadoData: {
        ID: 0,
        Nome: '',
        Sexo: '',
        Dia: null,
        Mes: null,
        Ano: null,
        Cidade: '',
        Contato: ''
    },
    editDadoData: {
      ID: null,
      Nome: '',
      Sexo: '',
      Dia: null,
      Mes: null,
      Ano: null,
      Cidade: '',
      Contato: ''
    },
    deleteDadoData:{
      ID: null
    },
    newDadoModal: false,
    editDadoModal: false,
    deleteDadoModal: false
  }
  componentWillMount() {
  this._refreshList()
  }
  toggleNewDado() {
    this.setState({
      newDadoModal: ! this.state.newDadoModal
    })
  }
  toggleEditDado() {
    this.setState({
      editDadoModal: !this.state.editDadoModal
    })
  }
  toggleDeleteDado(){
    this.setState({
      deleteDadoModal: !this.state.deleteDadoModal
    })
  }
  
  addDado(){
    axios.post('http://localhost:5000/dados', this.state.newDadoData).then((response)=>{
    let {dados} = this.state
    console.log(response.data)
    dados.push(response.data)
    this.setState({dados, newDadoModal:false, newDadoData:{
      ID: 0,
      Nome: '',
      Sexo: '',
      Dia: null,
      Mes: null,
      Ano: null,
      Cidade: '',
      Contato: ''
    }})
    })

  }
  updateDado() {
    console.log(this.state.editDadoData)
    let { ID, Nome, Sexo, Dia , Mes , Ano, Cidade, Contato} = this.state.editDadoData
axios.put('http://localhost:5000/dados' , this.state.editDadoData, { ID,
  Nome, Sexo, Dia , Mes , Ano, Cidade, Contato
}).then((response)=>{
  this._refreshList()
  this.setState({
    editDadoModal: false, editDadoData: {
      ID: null,
      Nome: '',
      Sexo: '',
      Dia: null,
      Mes: null,
      Ano: null,
      Cidade: '',
      Contato: ''
    }
  })
})
}
editDado(ID, Nome, Sexo, Dia, Mes, Ano, Cidade, Contato) {
    this.setState({
      editDadoData :{ID, Nome,Sexo,Dia,Mes, Ano, Cidade,Contato},
      editDadoModal: this.state.editDadoModal
    })
  }
  _refreshList() {
    axios.get('http://localhost:5000/dados').then((response) => {
      console.log(response.data)
      this.setState({
        dados: response.data
      })
    })
  }
 
    deleteFinally(){
      this.setState({
        deleteDadoData: this.state.deleteDadoData,
        deleteDadoModal:this.state.deleteDadoModal
      })
    axios.delete(`http://localhost:5000/dados/${this.state.deleteDadoData.ID}`).then(response=>{
    this._refreshList()
    this.setState({
      deleteDadoModal: false , 
      deleteDadoData: {
        ID: null
      }
    })
  })
  }
  getAnalise(){
    axios.get('http://localhost:5000/cidadeb').then((response) =>{
    this.setState({dadosBicas: response.data})
  })
  axios.get('http://localhost:5000/cidadej').then((response )=> {
    console.log(response.data)
    this.setState({
      dadosJf: response.data
    })
  })
  }
  
  render(){
  let dadosBicas = this.state.dadosBicas.map((dadob) => {
    return (
     <span>Nome: {dadob.Nome} <br/> Mês: {dadob.Mes} <br/> Sexo: {dadob.Sexo} <hr/></span>
    )
  })
  let dadosJf = this.state.dadosJf.map((dadoj)=>{
    return (
      <span>Nome: {dadoj.Nome} <br/> Mês: {dadoj.Mes} <br/> Sexo: {dadoj.Sexo} <hr/> </span>
    )
  })
  let dados = this.state.dados.map((dado)=> {
    return (
          <tr key={dado.ID}> 
               <td>{dado.ID}</td>
               <td>{dado.Nome}</td>
               <td>{dado.Sexo}</td>
               <td>{dado.Dia}</td>
               <td>{dado.Mes}</td>
               <td>{dado.Ano}</td>
               <td>{dado.Cidade}</td>
               <td>{dado.Contato}</td>
               <td>
                 <Button  onClick={this.toggleEditDado.bind(this)} style={{marginBottom:'10px', width:'40px'}}color="success" size="sm"><img src={edit} alt="edit"/></Button>
                 <Button onClick={this.toggleDeleteDado.bind(this)} style={{width:'40px'}}color="danger" size="sm"><img src={delet} alt="delet"/></Button>
               </td>
            </tr>
    )
  })
  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
      <span><i><h2 style={{color:'#fff'}}>Aue Software</h2></i></span>
    </nav>
    <Container>
    <Row>
      
      <Col>
      <h2>Adicionar Novo Usuário</h2>
      <Button style={{marginBottom:'20px', marginTop:'20px'}}color="primary" onClick={this.toggleNewDado.bind(this)}>Adicionar</Button>
      <Modal isOpen={this.state.newDadoModal} toggle={this.toggleNewDado.bind(this)}>
        <ModalHeader toggle={this.toggleNewDado.bind(this)}>Adicionar</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
                  <Label for="id">Identificador ID</Label>
                  <Input type="number" value={0} placeholher="Id do usuário"
                  onChange={(e)=> {
                    let {newDadoData} = this.state
                    newDadoData.id = e.target.value
                    this.setState({newDadoData})
                  }}/>
              </FormGroup>
              <FormGroup>
                  <Label for="nome">Nome</Label>
                  <Input type="text"  value={this.state.newDadoData.Nome} placeholher="Digite seu Nome"
                  onChange={(e)=> {
                    let {newDadoData} = this.state
                    newDadoData.Nome = e.target.value
                    this.setState({newDadoData})
                  }}/>
              </FormGroup>
              <FormGroup>
                  <Label for="Sexo">Sexo</Label>
                  <Input type="text" value={this.state.newDadoData.Sexo} maxLength="1"
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Sexo = e.target.value
                    this.setState({newDadoData})
                  }}>     
                  </Input>
                  <span style={{fontWeight:'bold', fontSize:'12px'}}><i> M Para Masculino e F para Feminino</i></span>
              </FormGroup>
              <FormGroup>
                  <Label for="Dia">Dia</Label>
                  <Input type="select" value={this.state.newDadoData.Dia} 
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Dia = e.target.value
                    this.setState({newDadoData})
                  }}>>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>1</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>31</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Mes">Mês</Label>
                  <Input type="select" value={this.state.newDadoData.Mes} id="mes"
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Mes = e.target.value
                    this.setState({newDadoData})
                  }}>>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Ano">Ano</Label>
                  <Input type="text" value={this.state.newDadoData.Ano}  placeholher="Ano"
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Ano = e.target.value
                    this.setState({newDadoData})
                  }}></Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Cidade">Cidade</Label>
                  <Input type="text" value={this.state.newDadoData.Cidade}  placeholher="Digite a Cidade"
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Cidade = e.target.value
                    this.setState({newDadoData})
                  }}></Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Contato">Contato</Label>
                  <Input type="text" value={this.state.newDadoData.Contato}  placeholher="Contato"
                  onChange={(e) => {
                    let {newDadoData} = this.state
                    newDadoData.Contato = e.target.value
                    this.setState({newDadoData})
                  }}></Input>
              </FormGroup>

        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addDado.bind(this)}>Adicionar</Button>
          <Button color="secondary" onClick={this.toggleNewDado.bind(this)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.editDadoModal} toggle={this.toggleEditDado.bind(this)}>
        <ModalHeader toggle={this.toggleEditDado.bind(this)}>Editar Usuário</ModalHeader>
        <ModalBody>
          <Form>
          <FormGroup>
                  <Label for="ID">ID Do usuário que deseja modificar</Label>
                  <Input type="number"  value={this.state.editDadoData.ID} placeholher="Id do usuário"
                  onChange={(e)=> {
                    let {editDadoData} = this.state
                    editDadoData.ID = e.target.value
                    this.setState({editDadoData})
                  }}/>
              </FormGroup>
              <FormGroup>
                  <Label for="nome">Nome</Label>
                  <Input type="text"  value={this.state.editDadoData.Nome} placeholher="Digite seu Nome"
                  onChange={(e)=> {
                    let {editDadoData} = this.state
                    editDadoData.Nome = e.target.value
                    this.setState({editDadoData})
                  }}/>
              </FormGroup>
              <FormGroup>
                  <Label for="Sexo">Sexo</Label>
                  <Input type="text" value={this.state.editDadoData.Sexo} maxLength="1"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Sexo = e.target.value
                    this.setState({editDadoData})
                  }}>
                  </Input>
                  <span style={{fontWeight:'bold', fontSize:'12px'}}><i> M Para Masculino e F para Feminino</i></span>
              </FormGroup>
              <FormGroup>
                  <Label for="Dia">Dia</Label>
                  <Input type="select" value={this.state.editDadoData.Dia} id="dia"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Dia = e.target.value
                    this.setState({editDadoData})
                  }}>>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>1</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>31</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Mes">Mês</Label>
                  <Input type="select" value={this.state.editDadoData.Mes} id="mes"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Mes = e.target.value
                    this.setState({editDadoData})
                  }}>>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Ano">Ano</Label>
                  <Input type="text" value={this.state.editDadoData.Ano} id="ano" placeholher="Ano"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Ano = e.target.value
                    this.setState({editDadoData})
                  }}></Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Cidade">Cidade</Label>
                  <Input type="text" value={this.state.editDadoData.Cidade} id="cidade" placeholher="Digite a Cidade"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Cidade = e.target.value
                    this.setState({editDadoData})
                  }}></Input>
              </FormGroup>
              <FormGroup>
                  <Label for="Contato">Contato</Label>
                  <Input type="text" value={this.state.editDadoData.Contato} placeholher="Contato"
                  onChange={(e) => {
                    let {editDadoData} = this.state
                    editDadoData.Contato = e.target.value
                    this.setState({editDadoData})
                  }}></Input>
              </FormGroup>

        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateDado.bind(this)}>Alterar</Button>
          <Button color="secondary" onClick={this.toggleEditDado.bind(this)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.deleteDadoModal} toggle={this.toggleDeleteDado.bind(this)}>
      <ModalHeader toggle={this.toggleDeleteDado.bind(this)}>Deseja mesmo Deletar este Usuário?</ModalHeader>
      <Label style={{marginLeft:'10px'}}for="ID"> Confirme o ID do usuário</Label>
      <Input type="number" placeholder="Confirmar..."value={this.state.deleteDadoData.ID} 
      onChange={(e)=> {
        let {deleteDadoData} = this.state
        deleteDadoData.ID = e.target.value
        this.setState({deleteDadoData})
      }}></Input>
      <ModalFooter>
        <Button onClick={this.deleteFinally.bind(this)}color="danger">Confirmar</Button>
      </ModalFooter>
      </Modal>
        <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Sexo</th>
                <th>Dia</th>
                <th>Mês</th>
                <th>Ano</th>
                <th>Cidade</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
             {dados}
            </tbody>
        </Table>
      </Col>
      <Col> 
      <Button onClick={this.getAnalise.bind(this)} style={{marginTop:'65px', marginLeft:'20px'}} color="primary">Análise de Dados</Button>
      <div style={{border: '5px solid black', marginTop:'20px', padding:'10px', alignItems:'center'}}
      className="analise-container">
         <h3 style={{fontWeight:'bold'}}>Numero total de Contatos: {dados.length}</h3>
          <span style={{fontWeight:'bold'}}>Contatos em Bicas: {dadosBicas.length }<br/>{dadosBicas}</span>
          -------------------------------------------------------------- <br/>
          <span style={{fontWeight:'bold'}}>Contatos em Juiz de Fora : {dadosJf.length} <br/> {dadosJf}</span>
          </div>



      </Col>
    </Row>

      </Container>
      </>
  );
}
}

export default App;
