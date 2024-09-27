<?php
// Registering scripts and styles for blocks
function reqruitment_task_enqueue_block_assets() {
    // Setting dynamic version based on the file modification time
    $block_js_version = filemtime( get_template_directory() . '/build/BlockLatestPosts.js' );

    // Registering styles and scripts in the editor
    wp_enqueue_script('reqruitment-task-block', get_template_directory_uri() . '/build/BlockLatestPosts.js', array('wp-blocks', 'wp-editor', 'wp-element', 'wp-components'), $block_js_version, true);
}
add_action('enqueue_block_editor_assets', 'reqruitment_task_enqueue_block_assets');

// Registering styles for the front end
function reqruitment_task_enqueue_block_style_assets() {
    // Setting version for the front end
    $block_css_version = filemtime( get_template_directory() . '/build/BlockLatestPosts.css' );

    // Registering styles on the front end
    wp_enqueue_style('reqruitment-task-block-style', get_template_directory_uri() . '/build/BlockLatestPosts.css', array(), $block_css_version);
}
add_action('wp_enqueue_scripts', 'reqruitment_task_enqueue_block_style_assets');
add_action('enqueue_block_editor_assets', 'reqruitment_task_enqueue_block_style_assets');