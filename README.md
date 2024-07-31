# Teste Tecnico para Techpines

<h3><summary>Tecnologias utilizadas</h3></summary>
<div align="center">
	<img width="60" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/>
	<img width="60" src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"/>
	<img width="60" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/>
	<img width="60" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="60" src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" alt="MySQL" title="MySQL"/>
	<img width="60" src="https://github.com/marwin1991/profile-technology-icons/assets/76662862/dbbc299a-8356-45e4-9d2e-a6c21b4569cf" alt="PHP" title="PHP"/>
	<img width="60" src="https://github.com/marwin1991/profile-technology-icons/assets/25181517/afcf1c98-544e-41fb-bf44-edba5e62809a" alt="Laravel" title="Laravel"/>
    <img width="60" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
 
    	
</div>

<h3><summary>O que ele faz?</summary></h3>
Criar interfaces acessíveis através de um browser que permita ao usuário gerenciar a discografia da dupla caipira Tião Carreiro e Pardinho. As ações que o usuário poderá executar são:
<ul>
    <li>Ver lista de álbuns e faixas</li>
    <li>Pesquisar álbuns e faixas por nome</li>
    <li>Adicionar um novo álbum</li>
    <li>Adicionar uma nova faixa em um álbum</li>
    <li>Excluir uma faixa</li>
    <li>Excluir um álbum</li>
</ul>

<summary><h3>Como rodar localmente 👨‍💻</h3></summary></br>
  
  ⚠️ Necessário Php, Composer, Mysql e Nodejs instalados ⚠️

1) Clone o repositório

```bash
$ git clone https://github.com/leandroSalesCotrim/techpines-teste-tecnico.git
```

2) Entre na pasta raíz do projeto

```bash
$ cd techpines-teste-tecnico
```

3) Instale as dependencias do PHP e do node

```bash
$ compose install
```
```bash
$ cd frontend
```
```bash
$ npm install
```

4) Crie um arquivo `.env` na pasta raiz do projeto contendo as informações para se conectar no seu banco local como no exemplo abaixo
obs: altere somente o usuario e senha de acordo com o seu banco
```bash
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=techpines
DB_USERNAME=SEU_USUARIO_DO_BANCO
DB_PASSWORD=SUA_SENHA_DO_BANCO
```

5) Com um terminal aberto no raiz do projeto inicie o backend Laravel

```bash
$ docker artisan serve
```

6) Abra um terminal na raiz do projeto, entre na pasta do frontend e inicie o frontend em react

```bash
$ cd frontend
```

```bash
$ npm start
```


<h1>Telas do projeto</h1>


![p1](https://github.com/user-attachments/assets/9d389864-bcf3-4f5a-91eb-f88befd3e8c1)
![p2](https://github.com/user-attachments/assets/e093abd6-4cb7-4049-b314-1d6c1bfc77dd)
![p3](https://github.com/user-attachments/assets/3ef2f8c9-855a-4deb-94df-cfe879d52a65)
![p4](https://github.com/user-attachments/assets/bddc8f05-e58e-4d55-9eae-c2afa52e2ee2)
![p5](https://github.com/user-attachments/assets/be83465b-2744-4dd9-a7a9-1cfc6416b66e)
![p6](https://github.com/user-attachments/assets/989af8f1-5a7a-493a-9a56-99e5e078e2f3)
![p7](https://github.com/user-attachments/assets/21f81d3b-f4a0-418c-81ff-222de93ec525)
![p8](https://github.com/user-attachments/assets/1c630c92-c467-4b6d-addd-c48d6ff4e3be)
![p9](https://github.com/user-attachments/assets/d07b9597-0fa3-4167-9b81-d34c858f7be5)

