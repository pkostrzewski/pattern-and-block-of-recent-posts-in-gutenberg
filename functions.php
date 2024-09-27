<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Theme configuration
require get_template_directory() . '/inc/theme-config.php'; 


// Registration of general scripts and styles
function reqruitment_task_enqueue_assets() {
    // Ustawianie dynamicznej wersji na podstawie czasu modyfikacji pliku
    $main_css_version = filemtime( get_template_directory() . '/build/main.css' );
    $main_js_version = filemtime( get_template_directory() . '/build/main.js' );

    wp_enqueue_style('reqruitment-task-style', get_template_directory_uri() . '/build/main.css', array(), $main_css_version);
    wp_enqueue_script('reqruitment-task-main', get_template_directory_uri() . '/build/main.js', array(), $main_js_version, true); 
}
add_action('wp_enqueue_scripts', 'reqruitment_task_enqueue_assets');


// Registration of scripts for blocks
require get_template_directory() . '/inc/block-registrations.php'; 


// Registration of block patterns
require get_template_directory() . '/inc/block-patterns.php';