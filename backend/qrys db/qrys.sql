use sales_system;
update products set is_active =1
SELECT id, name, business_id, is_active FROM products;
INSERT INTO `sales_system`.`products`
(`id`,`business_id`,`category_id`,`name`,`description`,`price`,`image`,`is_active`,`created_at`)
VALUES

(2,1,1,'Coca Cola 1.5L','Gaseosa Coca Cola botella 1.5 litros',2200,'cocacola15.jpg',1,CURRENT_TIMESTAMP),
(3,1,1,'Pepsi 500ml','Gaseosa Pepsi botella 500ml',1100,'pepsi500.jpg',1,CURRENT_TIMESTAMP),
(4,1,1,'Pepsi 1.5L','Gaseosa Pepsi botella 1.5 litros',2100,'pepsi15.jpg',1,CURRENT_TIMESTAMP),
(5,1,1,'Sprite 500ml','Gaseosa Sprite botella 500ml',1150,'sprite500.jpg',1,CURRENT_TIMESTAMP),
(6,1,1,'Sprite 1.5L','Gaseosa Sprite botella 1.5 litros',2150,'sprite15.jpg',1,CURRENT_TIMESTAMP),
(7,1,1,'Fanta 500ml','Gaseosa Fanta naranja 500ml',1150,'fanta500.jpg',1,CURRENT_TIMESTAMP),
(8,1,1,'Fanta 1.5L','Gaseosa Fanta naranja 1.5 litros',2150,'fanta15.jpg',1,CURRENT_TIMESTAMP),
(9,1,1,'Agua Mineral 500ml','Agua mineral sin gas 500ml',800,'agua500.jpg',1,CURRENT_TIMESTAMP),
(10,1,1,'Agua Mineral 1.5L','Agua mineral sin gas 1.5 litros',1400,'agua15.jpg',1,CURRENT_TIMESTAMP),
(11,1,1,'Agua con Gas 500ml','Agua mineral con gas 500ml',850,'aguagas500.jpg',1,CURRENT_TIMESTAMP),
(12,1,1,'Agua con Gas 1.5L','Agua mineral con gas 1.5 litros',1450,'aguagas15.jpg',1,CURRENT_TIMESTAMP),
(13,1,1,'Jugo Naranja','Jugo de naranja en botella',1300,'jugonaranja.jpg',1,CURRENT_TIMESTAMP),
(14,1,1,'Jugo Multifruta','Jugo multifruta botella',1300,'jugomultifruta.jpg',1,CURRENT_TIMESTAMP),
(15,1,1,'Jugo Manzana','Jugo de manzana botella',1300,'jugomanzana.jpg',1,CURRENT_TIMESTAMP),
(16,1,1,'Red Bull','Bebida energizante Red Bull',2500,'redbull.jpg',1,CURRENT_TIMESTAMP),
(17,1,1,'Monster Energy','Bebida energizante Monster',2600,'monster.jpg',1,CURRENT_TIMESTAMP),
(18,1,1,'Gatorade Naranja','Bebida isotónica sabor naranja',1800,'gatorade_naranja.jpg',1,CURRENT_TIMESTAMP),
(19,1,1,'Gatorade Frutas','Bebida isotónica sabor frutas',1800,'gatorade_frutas.jpg',1,CURRENT_TIMESTAMP),
(20,1,1,'Powerade','Bebida isotónica Powerade',1750,'powerade.jpg',1,CURRENT_TIMESTAMP);
SELECT * FROM categories;
INSERT INTO `sales_system`.`products`
(`business_id`,`category_id`,`name`,`description`,`price`,`image`,`is_active`,`created_at`)
VALUES
(1,1,'Coca Cola 500ml','Gaseosa Coca Cola botella 500ml',1200,'cocacola500.jpg',1,CURRENT_TIMESTAMP),
(1,1,'Sprite 1.5L','Gaseosa Sprite botella 1.5L',2200,'sprite15.jpg',1,CURRENT_TIMESTAMP),
(1,2,'Papas Fritas','Papas fritas sabor original',1500,'papas.jpg',1,CURRENT_TIMESTAMP),
(1,2,'Maní Salado','Maní tostado salado',900,'mani.jpg',1,CURRENT_TIMESTAMP),
(1,3,'Arroz 1kg','Arroz blanco largo fino',1300,'arroz.jpg',1,CURRENT_TIMESTAMP),
(1,3,'Fideos Spaghetti','Fideos secos tipo spaghetti',1100,'fideos.jpg',1,CURRENT_TIMESTAMP),
(1,4,'Leche Entera','Leche entera 1 litro',1400,'leche.jpg',1,CURRENT_TIMESTAMP),
(1,4,'Yogur Vainilla','Yogur sabor vainilla',1200,'yogur.jpg',1,CURRENT_TIMESTAMP),
(1,5,'Pan Francés','Pan fresco tipo francés',800,'pan.jpg',1,CURRENT_TIMESTAMP),
(1,5,'Facturas','Docena de facturas surtidas',4500,'facturas.jpg',1,CURRENT_TIMESTAMP),
(1,6,'Lavandina','Lavandina desinfectante',1000,'lavandina.jpg',1,CURRENT_TIMESTAMP),
(1,6,'Detergente','Detergente para platos',1300,'detergente.jpg',1,CURRENT_TIMESTAMP),
(1,7,'Shampoo','Shampoo cabello normal',2200,'shampoo.jpg',1,CURRENT_TIMESTAMP),
(1,7,'Jabón','Jabón de tocador',700,'jabon.jpg',1,CURRENT_TIMESTAMP),
(1,8,'Helado 1L','Helado pote 1 litro',3500,'helado.jpg',1,CURRENT_TIMESTAMP),
(1,8,'Hamburguesas','Caja hamburguesas congeladas',4200,'hamburguesas.jpg',1,CURRENT_TIMESTAMP),
(1,9,'Tomate','Tomate fresco por kilo',1800,'tomate.jpg',1,CURRENT_TIMESTAMP),
(1,9,'Papa','Papa blanca por kilo',1200,'papa.jpg',1,CURRENT_TIMESTAMP),
(1,10,'Carne Picada','Carne picada especial',4500,'carne_picada.jpg',1,CURRENT_TIMESTAMP),
(1,10,'Milanesas','Milanesas de carne',5200,'milanesas.jpg',1,CURRENT_TIMESTAMP);
DELETE FROM products
WHERE id IN (
  SELECT id FROM (
    SELECT id FROM products LIMIT 60
  ) AS temp
);
INSERT INTO `sales_system`.`categories`
(`id`,
`business_id`,
`name`,
`created_at`)
VALUES
(3,1,'Almacen',current_timestamp());

