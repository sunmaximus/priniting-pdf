import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf'
import 'bootstrap/scss/bootstrap.scss';

import { printDetails } from './printpdf'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  refValue;
  someRef = React.createRef();

  printData = () => {
    console.log(this.refValue)
    printDetails(this.refValue, 'test');
  }

  printSomePDF = () => {
    const doc = new jsPDF();
    doc.fromHTML(this.someRef.current.outerHTML, 15, 15, {
      'width': 170,
      // 'elementHandlers': true
    });
    doc.save('sample-file.pdf');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button variant="primary" onClick={this.printData}>Print</Button>
          <Button variant="primary" onClick={this.printSomePDF}>Print jsPDF</Button>
        </header>
        <div ref={(value) => { this.refValue = value }}>
          {`Whatever you want to print`}
        </div>
        <div ref={this.someRef}>
          {`Whatever you want to print`}
        </div>
      </div>
    );
  }
}

export default App;
