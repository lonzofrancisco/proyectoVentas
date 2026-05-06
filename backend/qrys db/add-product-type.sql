-- Agregar columna product_type a la tabla products
ALTER TABLE products ADD COLUMN product_type VARCHAR(50) DEFAULT 'other' AFTER is_active;

-- Actualizar los tipos de productos para TiendaEJ
UPDATE products p
SET p.product_type = 'burger'
WHERE p.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
AND p.category_id IN (
  SELECT id FROM categories 
  WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
  AND name LIKE '%Hamburguesa%'
);

UPDATE products p
SET p.product_type = 'drink'
WHERE p.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
AND p.category_id = (
  SELECT id FROM categories 
  WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
  AND name = 'Bebidas'
);

UPDATE products p
SET p.product_type = 'side'
WHERE p.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
AND p.category_id = (
  SELECT id FROM categories 
  WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
  AND name = 'Acompañamientos'
);

UPDATE products p
SET p.product_type = 'dessert'
WHERE p.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
AND p.category_id = (
  SELECT id FROM categories 
  WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
  AND name = 'Postres'
);

-- Verificar los cambios
SELECT 
  c.name as categoria,
  p.name as producto,
  p.product_type as tipo
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
ORDER BY c.name, p.product_type;
