<?php if (!defined ('ABSPATH')) die ('No direct access allowed'); ?>
<div class="date">
	<a href="#" class="redirection-edit"><img src="<?php echo $this->url () ?>/images/edit.png" width="16" height="16" alt="Edit"/></a>
	<a href="#" class="redirection-edit"><?php _e ('edit group', 'redirection'); ?></a>
</div>

<div class="count" id="info_<?php echo $group->id ?>">
	<?php if ($group->tracking) : ?>
	<a href="<?php echo $this->base (); ?>?page=redirection.php&amp;sub=log&amp;group=<?php echo $group->id ?>"><?php echo $group->hits (); ?></a>
	<?php else : ?>
		&mdash;
	<?php endif; ?>
</div>

<div class="item">
	<input class="check" type="checkbox" name="checkall[]" value="<?php echo $group->id ?>"/>
	<a href="<?php echo $this->base (); ?>?page=redirection.php&amp;sub=redirects&amp;id=<?php echo $group->id ?>"><?php echo htmlspecialchars ($group->name); ?></a><?php echo $group->items () ?>
	
	<?php if ($group->status == 'disabled') : ?>
		&mdash; <?php _e ('disabled', 'redirection'); ?>
	<?php endif; ?>
</div>