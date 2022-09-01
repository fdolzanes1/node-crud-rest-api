import {Request, Response, NextFunction} from 'express';
import pool from '../db/pg-connect';

export class ProductsControler {
  static getProducts (req: Request, res: Response, next: NextFunction) {
    pool.query('SELECT * FROM products', (error, data) => {
      if (error) {
        throw error
      }
      res.status(200).json(data.rows)
    });
  }

  static getProductsById (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id_product;
    
    pool.query('SELECT * FROM products WHERE id_product = $1', [id], (error, data) => {
      if (error) {
        throw error
      }
      res.status(200).json(data.rows)
    });
  }

  static createProduct (req: Request, res: Response, next: NextFunction) {

    const { nome, preco } = req.body;
  
    pool.query('INSERT INTO products (nome, preco) VALUES ($1, $2) RETURNING *', [nome, preco], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Products added with ID: ${results.rows[0].id_product}`)
    })
  }

  static updateProduct (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id_product;
    const { nome, preco } = req.body;
  
    pool.query(
      'UPDATE products SET nome = $1, preco = $2 WHERE id_product = $3',
      [nome, preco, id],
      (error, data) => {
        if (error) {
          res.status(400).send(`Error: ${error}`);
          next()
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  static deleteProduct (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id_product;
    pool.query('DELETE FROM products WHERE id_product = $1', [id], (error, data) => {
      if (error) {
        res.status(400).send(`Error: ${error}`);
        next()
      }
      res.status(200).send(`Product deleted with ID: ${id}`)
    })
  }
}