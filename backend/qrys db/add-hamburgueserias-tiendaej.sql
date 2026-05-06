-- Script para agregar hamburguesas a TiendaEj

-- Primero, obtener el ID de TiendaEj
-- SELECT id FROM businesses WHERE slug = 'TiendaEj';

-- Limpiar productos previos de TiendaEj si existen
DELETE FROM products WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj');
DELETE FROM categories WHERE business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj');

-- Insertar categorías para hamburguesería
INSERT INTO `ventas`.`categories` (`business_id`, `name`, `created_at`)
SELECT id, 'Hamburguesas Simples', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj'
UNION ALL
SELECT id, 'Hamburguesas Premium', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj'
UNION ALL
SELECT id, 'Hamburguesas Especiales', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj'
UNION ALL
SELECT id, 'Acompañamientos', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj'
UNION ALL
SELECT id, 'Bebidas', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj'
UNION ALL
SELECT id, 'Postres', CURRENT_TIMESTAMP FROM businesses WHERE slug = 'TiendaEj';

-- Insertar productos de hamburguesas simples
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Hamburguesa Clásica', 'Pan, carne, lechuga, tomate, cebolla y mayonesa', 2500, '/api/images/medium/hamburguesa-clasica.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Simples' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Con Queso', 'Carne, queso derretido, lechuga, tomate y cebolla', 2800, '/api/images/medium/hamburguesa-queso.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Simples' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Doble', 'Dos medallones de carne, queso, lechuga, tomate y cebolla', 3500, '/api/images/medium/hamburguesa-doble.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Simples' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Bacon', 'Carne, bacon crujiente, queso, tomate y cebolla', 3200, '/api/images/medium/hamburguesa-bacon.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Simples' AND c.business_id = b.id;

-- Insertar productos de hamburguesas premium
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Hamburguesa Angus Premium', 'Carne Angus premium, queso brie, cebolla caramelizada y rúcula', 4500, '/api/images/medium/hamburguesa-angus.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Premium' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa BBQ', 'Carne premium, bacon, cebolla crispy, queso cheddar y salsa BBQ', 4800, '/api/images/medium/hamburguesa-bbq.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Premium' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Champiñones', 'Carne premium, champiñones sofritados, queso suizo y cebolla', 4200, '/api/images/medium/hamburguesa-champinones.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Premium' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Triple Queso', 'Carne, queso cheddar, queso suizo y queso brie con salsa especial', 5000, '/api/images/medium/hamburguesa-triple-queso.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Premium' AND c.business_id = b.id;

-- Insertar productos de hamburguesas especiales
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Hamburguesa Vegetariana', 'Medallón de verduras, queso, tomate, lechuga y especias', 2900, '/api/images/medium/hamburguesa-vegetariana.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Especiales' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Picante', 'Carne, jalapeños, cebolla morada, queso, salsa picante y mayo', 3600, '/api/images/medium/hamburguesa-picante.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Especiales' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Completa', 'Carne, huevo frito, bacon, queso, lechuga, tomate y cebolla', 4500, '/api/images/medium/hamburguesa-completa.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Especiales' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Hamburguesa Hawaiana', 'Carne, piña, jamón, queso derretido y salsa especial', 4000, '/api/images/medium/hamburguesa-hawaiana.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Hamburguesas Especiales' AND c.business_id = b.id;

-- Insertar acompañamientos
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Papas Fritas Medianas', 'Papas fritas crujientes', 1200, '/api/images/medium/papas-medianas.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Acompañamientos' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Papas Fritas Grandes', 'Papas fritas crujientes porción grande', 1800, '/api/images/medium/papas-grandes.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Acompañamientos' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Aros de Cebolla', 'Aros de cebolla rebozados y fritos', 1500, '/api/images/medium/aros-cebolla.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Acompañamientos' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Palitos de Queso', 'Palitos de queso cheddar fritos', 1800, '/api/images/medium/palitos-queso.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Acompañamientos' AND c.business_id = b.id;

-- Insertar bebidas
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Coca Cola 500ml', 'Gaseosa Coca Cola', 900, '/api/images/medium/coca-cola.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Bebidas' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Sprite 500ml', 'Gaseosa Sprite', 900, '/api/images/medium/sprite.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Bebidas' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Agua Mineral 500ml', 'Agua mineral sin gas', 600, '/api/images/medium/agua-mineral.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Bebidas' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Jugo Natural', 'Jugo natural recién exprimido', 1200, '/api/images/medium/jugo-natural.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Bebidas' AND c.business_id = b.id;

-- Insertar postres
INSERT INTO `ventas`.`products` (`business_id`, `category_id`, `name`, `description`, `price`, `image`, `is_active`, `created_at`)
SELECT b.id, c.id, 'Helado 2 Sabores', 'Helado con 2 sabores a elección', 1500, '/api/images/medium/helado-2sabores.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Postres' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Brownie con Helado', 'Brownie de chocolate con helado de vainilla', 2200, '/api/images/medium/brownie-helado.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Postres' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Sundae de Chocolate', 'Helado con salsa de chocolate, frutos secos y crema', 2000, '/api/images/medium/sundae-chocolate.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Postres' AND c.business_id = b.id
UNION ALL
SELECT b.id, c.id, 'Frutilla con Crema', 'Frutilla fresca con crema batida', 1800, '/api/images/medium/frutilla-crema.jpg', 1, CURRENT_TIMESTAMP
FROM businesses b, categories c 
WHERE b.slug = 'TiendaEj' AND c.name = 'Postres' AND c.business_id = b.id;

-- Verificar que se insertaron correctamente
SELECT c.name, COUNT(p.id) as cantidad_productos
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
WHERE c.business_id = (SELECT id FROM businesses WHERE slug = 'TiendaEj')
GROUP BY c.id, c.name;



