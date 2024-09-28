<?php
// Registering scripts and styles for blocks
function reqruitment_task_enqueue_block_assets() {
    $block_js_version = filemtime( get_template_directory() . '/build/BlockLatestPosts.js' );
    wp_enqueue_script('reqruitment-task-block', get_template_directory_uri() . '/build/BlockLatestPosts.js', array('wp-blocks', 'wp-editor', 'wp-element', 'wp-components'), $block_js_version, true);
}
add_action('enqueue_block_editor_assets', 'reqruitment_task_enqueue_block_assets');

// Registering styles for the front end
function reqruitment_task_enqueue_block_style_assets() {
    $block_css_version = filemtime( get_template_directory() . '/build/BlockLatestPosts.css' );
    wp_enqueue_style('reqruitment-task-block-style', get_template_directory_uri() . '/build/BlockLatestPosts.css', array(), $block_css_version);
}
add_action('wp_enqueue_scripts', 'reqruitment_task_enqueue_block_style_assets');
add_action('enqueue_block_editor_assets', 'reqruitment_task_enqueue_block_style_assets');

// Render for dynamic posts
function recruitment_task_render_latest_posts_block($attributes) {
    // Default settings
    $superscription = isset($attributes['superscription']) ? $attributes['superscription'] : 'latest posts';
    $title = isset($attributes['title']) ? $attributes['title'] : 'Lorem ipsum dolor sit amet...';
    $text = isset($attributes['text']) ? $attributes['text'] : 'View all posts';
    $link = isset($attributes['link']) ? $attributes['link'] : '/url-view-all-posts';
    $order = isset($attributes['order']) ? $attributes['order'] : 'DESC';

    // Downloading posts
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 4,
        'orderby' => 'date',
        'order' => $order,
        'meta_query' => array(
            'relation' => 'OR',
            array('key' => '_wp_page_template', 'compare' => 'NOT EXISTS'),
        ),
    );
    $posts_query = new WP_Query($args);

    // Generate HTML for posts
    ob_start();
    ?>
    <section class="wp-block-reqruitment-task-latest-posts">
        <div class="wrapper">
            <div class="section-header">
                <div class="heading">
                    <span><?php echo esc_html($superscription); ?></span>
                    <h2><?php echo esc_html($title); ?></h2>
                </div>
                <div class="view-all-posts">
                    <div class="view-all-posts-label">
                        <a href="<?php echo esc_url($link); ?>"><p><?php echo esc_html($text); ?></p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                                <path d="M5.64645 5.64645C5.84171 5.84171 5.84171 6.15829 5.64645 6.35355L0.853552 11.1464C0.53857 11.4614 -1.44492e-06 11.2383 -1.42545e-06 10.7929L-1.00644e-06 1.20711C-9.86967e-07 0.761654 0.53857 0.538571 0.853552 0.853553L5.64645 5.64645Z" fill="#22B4AB"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="latest-posts">
                <?php if ($posts_query->have_posts()) : ?>
                    <?php while ($posts_query->have_posts()) : $posts_query->the_post(); ?>
                        <div class="post">
                            <div class="thumbnail">
                                <?php if (has_post_thumbnail()) : ?>
                                    <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>" alt="<?php the_title(); ?>" class="post-thumbnail"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="175" height="178" viewBox="0 0 175 178" fill="none">
                                        <path d="M0 1.5299e-05L3.02464e-07 178L175 178L0 1.5299e-05Z"/>
                                    </svg>
                                <?php endif; ?>
                            </div>
                            <div class="details">
                                <div class="details-contents">
                                    <?php if (is_sticky()) : ?>
                                        <div class="featured-post">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                                <path d="M6.5 1.61803L7.48381 4.6459L7.59607 4.99139H7.95934H11.143L8.56737 6.86271L8.27348 7.07624L8.38573 7.42173L9.36955 10.4496L6.79389 8.57827L6.5 8.36475L6.20611 8.57827L3.63045 10.4496L4.61426 7.42173L4.72652 7.07624L4.43263 6.86271L1.85697 4.99139H5.04066H5.40393L5.51619 4.6459L6.5 1.61803Z" stroke="#FF4043"/>
                                            </svg>
                                            <span>Featured post</span>
                                        </div>
                                    <?php endif; ?>
                                    <a href="<?php the_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
                                    <p><?php echo wp_trim_words(get_the_excerpt(), 15, '...'); ?></p>
                                </div>
                                <a href="<?php the_permalink(); ?>" class="read-more">Read more</a>
                            </div>
                        </div>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                <?php else : ?>
                    <p>No posts found.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

// Registration of a dynamic block
function recruitment_task_register_dynamic_block() {
    register_block_type('recruitment-task/latest-posts', array(
        'render_callback' => 'recruitment_task_render_latest_posts_block',
        'attributes' => array(
            'superscription' => array('type' => 'string', 'default' => 'latest posts'),
            'title' => array('type' => 'string', 'default' => 'Lorem ipsum dolor sit amit...'),
            'text' => array('type' => 'string', 'default' => 'View all posts'),
            'link' => array('type' => 'string', 'default' => '/url-view-all-posts'),
            'order' => array('type' => 'string', 'default' => 'DESC'),
        ),
    ));
}
add_action('init', 'recruitment_task_register_dynamic_block');