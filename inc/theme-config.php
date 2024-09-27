<?php
function reqruitment_task_setup() {
    load_theme_textdomain( 'reqruitment-task', get_template_directory() . '/languages' );

    // Support for featured images
    add_theme_support( 'post-thumbnails' );

    // Menu registration
    register_nav_menus( array(
        'primary' => __( 'Menu główne', 'reqruitment-task' ),
    ) );

    // Gutenberg support
    add_theme_support( 'align-wide' );
    add_theme_support( 'editor-styles' );
    //add_editor_style( 'build/main.css' );
}
add_action( 'after_setup_theme', 'reqruitment_task_setup' );