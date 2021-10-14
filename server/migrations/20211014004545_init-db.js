exports.up = function(knex) {
    return knex.raw(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE SEQUENCE IF NOT EXISTS public.user_id_seq;
        CREATE TABLE IF NOT EXISTS public.user (
                id int NOT NULL DEFAULT nextval('user_id_seq'),
                name text NOT NULL,
                email text NOT NULL UNIQUE,
                password text NOT NULL,
                utc_created_on timestamp NOT NULL DEFAULT now(),

                CONSTRAINT user_pkey PRIMARY KEY (id)
        );
        ALTER SEQUENCE IF EXISTS public.user_id_seq OWNED BY public.user.id;

        CREATE SEQUENCE IF NOT EXISTS public.board_id_seq;
        CREATE TABLE IF NOT EXISTS public.board (
            id int NOT NULL DEFAULT nextval('board_id_seq'),
                title text NOT NULL,
                description text,
                link text NOT NULL UNIQUE,
                utc_created_on timestamp NOT NULL DEFAULT now(),

                CONSTRAINT board_pkey PRIMARY KEY (id)
        );
        ALTER SEQUENCE IF EXISTS public.board_id_seq OWNED BY public.board.id;

        CREATE TYPE public.user_role AS ENUM ('admin', 'guess');
        CREATE TABLE IF NOT EXISTS public.user_board (
            user_id int NOT NULL,
                board_id int NOT NULL,
                role public.user_role NOT NULL, 
                utc_created_on timestamp NOT NULL DEFAULT now(),

                CONSTRAINT user_board_user_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
                CONSTRAINT user_board_board_fkey FOREIGN KEY (board_id) REFERENCES public.board(id),
                CONSTRAINT user_board_pkey PRIMARY KEY (user_id, board_id)
        );

        CREATE TABLE IF NOT EXISTS public.task (
            id UUID NOT NULL DEFAULT uuid_generate_v4(),
                board_id int NOT NULL,
                title text NOT NULL,
                description text,
                utc_delete_on timestamp,
                utc_completed_on timestamp,
                utc_created_on timestamp DEFAULT now(),

                CONSTRAINT task_pkey PRIMARY KEY (id),
                CONSTRAINT task_board_fkey FOREIGN KEY (board_id) REFERENCES public.board(id)
        );

        CREATE TYPE public.event AS ENUM ('create', 'delete', 'complete');
        CREATE TABLE IF NOT EXISTS public.task_event (
            user_id int NOT NULL,
                task_id UUID NOT NULL,
                event public.event NOT NULL,
                metadata jsonb,
                utc_created_on timestamp NOT NULL DEFAULT now(),

                CONSTRAINT task_event_user_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
                CONSTRAINT task_event_task_fkey FOREIGN KEY (task_id) REFERENCES public.task(id),
                CONSTRAINT task_event_pkey PRIMARY KEY (user_id, task_id)
        );
    `);  
};

exports.down = function(knex) {
    return knex.raw(`
        DROP TABLE public.task_event;
        DROP TYPE public.event;
        DROP TABLE public.task;
        DROP TABLE public.user_board;
        DROP TYPE public.user_role;
        DROP TABLE public.board;
        DROP TABLE public.user;
        DROP EXTENSION "uuid-ossp"; 
    `);
};
