<?php

function recruitment_task_register_patterns_and_categories() {
    // Registration of pattern categories
    register_block_pattern_category('section-patterns', array('label' => __('Sections', 'recruitment-task')));

    // Registration of block patterns
    register_block_pattern(
        'reqruitment-task/latest-posts-pattern',
        array(
            'title'       => __( 'Latest Posts Pattern', 'recruitment-task' ),
            'description' => _x( 'A section that shows the latest posts.', 'Block pattern description', 'recruitment-task' ),
            'content'     => '<!-- wp:reqruitment-task/latest-posts /-->',
            'categories'    => array('section-patterns'),
            'keywords'    => array( 'latest', 'posts' )
        )
    );
}
add_action('init', 'recruitment_task_register_patterns_and_categories');