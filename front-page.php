<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
get_header();
?>

<main id="main" class="site-main" role="main">
    <article class="post">
        <div class="entry-content">
            <?php
                echo apply_filters('the_content', get_post_field('post_content', get_queried_object_id()));
            ?>
        </div><!-- .entry-content -->
    </article><!-- .post -->
</main><!-- #main -->

<?php
get_footer();
