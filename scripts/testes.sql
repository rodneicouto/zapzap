select e.* 
from evento e 
	join evento_grupo eg on e.id = eg.evento_id
	join grupo g on eg.grupo_id = g.id
	join cliente_grupo cg on g.id = cg.grupo_id
	join cliente c on cg.cliente_id = c.id
	and c.email = 'email@01.com'
	
select * from evento_grupo
select * from evento
select * from grupo
select * from cliente_grupo

insert into evento_grupo (evento_id, grupo_id) values (1, 1)
insert into cliente_grupo (cliente_id, grupo_id) values (1,1)

